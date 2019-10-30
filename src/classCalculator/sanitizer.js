export default {
    omitClasses(classList, condition) {
        return classList.filter((className) => {
            return !condition(className);
        });
    },

    shouldOmit(className, { BEM, utilityRegex, specialOnes }) {
        return (BEM && className.includes('--'))
        || specialOnes.includes(className)
        || utilityRegex.test(className);
    },

    getSemanticClasses(classListDomToken, { BEM, utilityRegex, specialOnes }) {
        const semanticClasses = [];
        const classList = Array.from(classListDomToken);

        classList.forEach((className) => {
            const shouldOmit = this.shouldOmit(className, { BEM, utilityRegex, specialOnes });
            if (!shouldOmit) {
                semanticClasses.push(className);
            }
        });

        return semanticClasses;
    }
};
