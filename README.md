# Vue Container Query 2

🧐 Because `vue-container-query` was already taken, and the API is slightly similar to `vue-container-query` package. So, thank you the maintainer.

Vue plugin for working with css container query as easy as possible.

💥 **This is the beta version. It's safe for production, but keep an eye on the documentations if you want to upgrade the package. There probably will be breaking changes in the first major release**

---

## Installation

```bash
npm install vue-container-query-2
// or
yarn add vue-container-query-2
```

This is also available on [jsdeliver](https://www.jsdelivr.com/) and [unpkg](https://unpkg.com/).

---

## Usage

Import and register the `vue-container-query-2` plugin first.

```javascript
import VueContainerQuery from 'vue-container-query-2';
Vue.use(VueContainerQuery, options);
```

And :tada: voila, now you have a `cq` option in every SFCs like below

```javascript
export default {
  name: 'SearchField',
  cq: {
    large: { minWidth: 900 },
    medium: { maxWidth: 600 },
    small: { maxWidth: 460 }
  },
  data() {
      return {}
  },
  ...
```

---

:warning: for `maxWidth` you get `<=`, but for `minWidth` it's `>` and no `=`. So the behavior is not quite like CSS Media Queries. Although it's a little bit more well formatted. **But it may change during next major release. so, heads up.**

---

After defining the breakpoints, you'll have reactive `$cq` variable in your component. You can use this anyhow you need. Maybe dynamic classes, maybe show/hide other element or components, whatever.

```vue
<div
    :class="{
        'search--small': $cq.small
    }
>
    <span v-if="$cq.large">
        Yo. I only get rendered if the component is 900px or wider
    </span>
</div>
```

This is a sample of how `$cq` object looks like in the instance's context:

```javascript
{
    contentRect: {
        x:0,
        y: 0,
        width:1300, 
        height: 2124, 
        top: 0,
        right: 1300,
        bottom: 2124,
        left:0
    },
    breakpoints: {
        large: { minWidth: 900 }
        medium: { maxWidth: 600 },
        small: { maxWidth: 460 }
    },
    resizeObserver: [object ResizeObserver],
    large: true
    medium: true,
    small: false
}
```

---

## Options

This is the default options:

```javascript
{
    classNames: {
        sizes: {
            xsmall: 'xsmall',
            small: 'small',
            medium: 'medium',
            large: 'large',
            xlarge: 'xlarge'
        },
        prepend: ''
    },
    useBEM: true,
    utilityClassNamesRegex: /$^/,
    ignoredClasses: ['']
}
```

You can override these when registering the plugin:

```javascript
Vue.use(VueContainerQuery, {
  classNames: {
    sizes: {
      xsmall: 'size:xsmall',
      small: 'size:small',
      medium: 'size:medium',
      large: 'size:large',
      xlarge: 'size:xlarge'
    }
  },
  useBEM: true,
  utilityClassNamesRegex: /u-/g,
});
```

☝ _All options are only useful when you are using `v-cq` directive. the core works fine without any provided option_

### `useBEM`

If set `true`, the classes will respect the BEM convention. Say your element has a `search` class, then when small condition is on a `search--small` class will be added to the element. VCQ is smart enough to ignore `--` classes when generating new class names. But if your element has multiple classes like `search` `header`, you will get both `search--small` and `header--small`. So if you are using `useBEM`, make sure you implement a valid BEM structure. Otherwise this plugin won't work as intended.

### `utilityClassNamesRegex`

You can set a regex to ignore any sort of utility class that you don't want to consider as semantic.

### ignoredClasses

You can set an array to ignore any sort of class that you don't want to consider as semantic.

---

## Directive

This may be the best feature of this package: a super handy `v-cq` directive available to automate the process of setting size classes. So, all you need to do in order to make an element get size classes is like as follows:

```vue
<div
    v-cq
    class="card"
>
    ...
></div>

<!-- <div class="card card--small"><div> -->
<!-- <div class="card card--medium"><div> -->
<!-- <div class="card card--large"><div> -->
```

See there? No `:class` and checking for `$cq.small` or anything. Size classes will automatically get generated and attached to element. Remember that size classes are based on what you set in options. If not set, default ones are applied as fallback.

---

## 👨‍💻 ToDo

- [ ] Add unit tests.
- [x] Detect utility classes to prevent adding "size classes" to them.
- [x] Add option to explicitly mention main class name. It's very useful if you're using utility first CSS classes.
