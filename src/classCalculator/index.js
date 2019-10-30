import sanitizer from './sanitizer';
import cqMapper from './cqMapper';

class ClassCalculator {
    #appliedCqClasses = []

    constructor(context, $el, options) {
        this.context = context;
        this.options = options;
        this.$el = $el;
    }

    readSemanticClasses() {
        return sanitizer.getSemanticClasses(this.$el.classList, {
            BEM: this.options.useBEM,
            utilityRegex: this.options.utilityClassNamesRegex,
            specialOnes: this.options.ignoredClasses
        });
    }

    getAppliedCqClasses() {
        return sanitizer.getAppliedCqClasses(this.$el.classList);
    }

    figureOutNewClasses() {
        return cqMapper.getCqClassNames(this.context.$cq, this.$el, this.readSemanticClasses(), this.options);
    }

    removeOldClasses() {
        this.#appliedCqClasses.forEach((classToRemove) => {
            this.$el.classList.remove(
                this.#appliedCqClasses.pop()
            );
        });
    }

    addNewClasses() {
        const classesToAdd = this.figureOutNewClasses();
        const classesListToAdd = Array.isArray(classesToAdd) ? classesToAdd : [classesToAdd];
        classesListToAdd.forEach((classToAdd) => {
            this.$el.classList.add(classToAdd);
            this.#appliedCqClasses.push(classToAdd);
        });
    }

    setNewClasses() {
        this.removeOldClasses();
        this.addNewClasses();
    }
}

export default ClassCalculator;
