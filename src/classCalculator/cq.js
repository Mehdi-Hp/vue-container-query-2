const cssMediaQueryResolver = {
    maxWidth(desired, actual) {
        console.log({ desired, actual });
        return actual <= desired;
    },
    minWidth(desired, actual) {
        return actual > desired;
    }
};

export default {
    getApplicableCqNames($el, $cq, semanticClasses, options) {
        const applicableCQs = Object.keys($cq).filter((CqKey) => {
            return $cq[CqKey] === true;
        });
        const appliedBreakpoints = [];
        applicableCQs.forEach((applicableCQ) => {
            const breakpointPairs = Object.entries($cq.breakpoints[applicableCQ]);
            breakpointPairs.forEach((breakpointPair) => {
                if (
                    cssMediaQueryResolver[breakpointPair[0]](breakpointPair[1], $cq.contentRect.width)
                ) {
                    if (options.useBEM) {
                        semanticClasses.forEach((semanticClass) => {
                            appliedBreakpoints.push(
                                `${semanticClass}--${options.classNames.prepend}${options.classNames.sizes[applicableCQ]}`
                            );
                        });
                    } else {
                        appliedBreakpoints.push(`
                            ${options.classNames.prepend}${options.classNames.sizes[applicableCQ]}
                        `);
                    }
                }
            });
        });
        return appliedBreakpoints;
    },
    getCqClassNames($cq, $el, semanticClasses, options) {
        return this.getApplicableCqNames($el, $cq, semanticClasses, options);
    }
};
