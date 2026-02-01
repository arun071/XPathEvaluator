/**
 * Evaluates an XPath expression against an XML string.
 * @param {string} xmlString - The XML content to parse.
 * @param {string} xpathExpression - The XPath to evaluate.
 * @returns {Array|string|number|boolean|Error} - The evaluation results.
 */
export const evaluateXPath = (xmlString, xpathExpression) => {
    if (!xmlString.trim()) return [];
    if (!xpathExpression.trim()) return [];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Check for XML parsing errors
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
        throw new Error("Invalid XML: " + parseError[0].textContent);
    }

    try {
        // Basic namespace resolver (returns null for default)
        const resolver = xmlDoc.createNSResolver(xmlDoc.documentElement);

        const result = xmlDoc.evaluate(
            xpathExpression,
            xmlDoc,
            resolver,
            XPathResult.ANY_TYPE,
            null
        );

        const matches = [];

        switch (result.resultType) {
            case XPathResult.STRING_TYPE:
                return result.stringValue;
            case XPathResult.NUMBER_TYPE:
                return result.numberValue;
            case XPathResult.BOOLEAN_TYPE:
                return result.booleanValue;
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            case XPathResult.ORDERED_NODE_ITERATOR_TYPE: {
                let node = result.iterateNext();
                while (node) {
                    matches.push({
                        name: node.nodeName || 'N/A',
                        value: node.textContent || '',
                        path: getXPath(node),
                        type: getNodeTypeString(node.nodeType),
                        outerHTML: node.outerHTML || node.textContent, // Fallback for attributes/text
                    });
                    node = result.iterateNext();
                }
                return matches;
            }
            default:
                return "Unsupported result type";
        }
    } catch (err) {
        throw new Error("Invalid XPath: " + err.message);
    }
};

/**
 * Gets the simplified XPath for a specific node.
 * @param {Node} node 
 * @returns {string}
 */
function getXPath(node) {
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
        return getXPath(node.ownerElement) + '/@' + node.nodeName;
    }
    if (node.nodeType === Node.TEXT_NODE) {
        return getXPath(node.parentNode) + '/text()';
    }
    if (!node.parentNode || node.nodeType !== Node.ELEMENT_NODE) {
        return "";
    }

    const parts = [];
    while (node && node.nodeType === Node.ELEMENT_NODE) {
        let index = 0;
        let sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
                index++;
            }
            sibling = sibling.previousSibling;
        }
        const name = node.nodeName;
        const part = index > 0 ? `${name}[${index + 1}]` : name;
        parts.unshift(part);
        node = node.parentNode;
    }
    return parts.length ? '/' + parts.join('/') : '/';
}

function getNodeTypeString(type) {
    const types = {
        1: 'Element',
        2: 'Attribute',
        3: 'Text',
        4: 'CDATA',
        7: 'Processing Instruction',
        8: 'Comment',
        9: 'Document'
    };
    return types[type] || 'Unknown';
}
