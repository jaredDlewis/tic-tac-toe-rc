/**
 * Custom ESLint rule: useGameStateManagement may only be called inside the
 * GameProvider component function.
 */

const HOOK_NAME = 'useGameStateManagement';
const ALLOWED_FUNCTION = 'GameProvider';

/** Resolve the name of the function node that encloses a call, if any. */
function getEnclosingFunctionName(node) {
  switch (node.type) {
    // function GameProvider() {}
    case 'FunctionDeclaration':
      return node.id ? node.id.name : null;
    // const GameProvider = () => {} / function () {}
    case 'FunctionExpression':
    case 'ArrowFunctionExpression': {
      const { parent } = node;
      if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
        return parent.id.name;
      }
      // export default function GameProvider() {} keeps its id above,
      // but `const X = forwardRef(() => {})`-style wrappers fall through.
      if (
        parent.type === 'CallExpression' &&
        parent.parent.type === 'VariableDeclarator' &&
        parent.parent.id.type === 'Identifier'
      ) {
        return parent.parent.id.name;
      }
      return node.id ? node.id.name : null;
    }
    default:
      return null;
  }
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: `Only call ${HOOK_NAME} inside the ${ALLOWED_FUNCTION} component`,
    },
    schema: [],
    messages: {
      outsideProvider: `${HOOK_NAME} may only be called inside the ${ALLOWED_FUNCTION} component.`,
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type !== 'Identifier' ||
          node.callee.name !== HOOK_NAME
        ) {
          return;
        }

        // Walk up the ancestors to find the closest enclosing function.
        const ancestors = context.sourceCode.getAncestors(node);
        for (let i = ancestors.length - 1; i >= 0; i--) {
          const ancestor = ancestors[i];
          if (
            ancestor.type === 'FunctionDeclaration' ||
            ancestor.type === 'FunctionExpression' ||
            ancestor.type === 'ArrowFunctionExpression'
          ) {
            if (getEnclosingFunctionName(ancestor) !== ALLOWED_FUNCTION) {
              context.report({ node, messageId: 'outsideProvider' });
            }
            return;
          }
        }

        // Called at module scope, not inside any function.
        context.report({ node, messageId: 'outsideProvider' });
      },
    };
  },
};
