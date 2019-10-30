# Vue Container Query 2

Vue plugin for working with css container query as easy as possible.

💥 **This is the beta version. it's safe for production, but keep an eye on documentations if you upgrade the package. There probably will be breaking changes after first major release**

## Installation

```bash
npm install vue-container-query-2
// or
yarn add vue-container-query-2
```

This is also available on [jsdeliver](https://www.jsdelivr.com/) and [unpkg](https://unpkg.com/).

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

:warning: for `maxWidth` you get `<=`, but for `minWidth` it's `>` and no `=`. So the behavior is not quite like CSS Media Queries and it's a little well formatted. **But it may change during next major release. so, heads up.**

After defining breakpoints, you'll have reactive `$cq` variable in your component. you can use this anyhow you need.

```vue
<div
    :class="{
        'search--small': $eq.small
    }
>
    <span v-if="$eq.large">
        Yo. I only get rendered if the componenet is 900px or wider
    </span>
</div>
```

This is a sample of how `$eq` object looks like:

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

## Options

This is default options:

```javascript
{
    classNames: {
        sizes: {
            xsmall: 'xsmall',
            small: 'small',
            medium: 'medium',
            large: 'large',
            xlarge: 'xlarge'
        }
    },
    useBEM: true,
    utilityClassNamesRegex: /(?:)/,
    ignoredClasses: []
}
```

you can override these when registering the plugin

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

☝ _`classNames` and `useBEM` only works if you are using `v-cq` directive._

### `useBEM`

If this set as `true`, the classes will respect the BEM convention. say your element has `search` class. then when small condition is on, a `search--small` class adds to element. VCQ is smart enough to ignore `--` classes when generating new class names. but if your element has multiple classes like `search` `header`, you will get both `search--small` and `header--small`. so if you are using `useBEM` make sure you implement the true BEM. otherwise this plugin won't work that nice.

### `utilityClassNamesRegex`

You can set a regex to ignore any sort of utility class that you don't want to consider as semantic class.

### ignoredClasses

You can set an array to ignore any sort of class that you don't want to consider as semantic class.

## Directive

This may be the best feature of thin package. There also is a handy `v-cq` directive available to automate the process of setting size classes. so, all you need to make the element to get size classes is like below:

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

See there? no `:class` and checking for `$cq.small` or something. size classes will automatically calculate and get attached to element. remember that size classes are based on what you did set in options, if not, default ones as fallback.

## 👨‍💻 ToDo

- [ ] Add unit tests.
- [x] Detect utility classes to prevent adding "size classes" to them.
- [x] Add option to explicitly mention main class name. It's very useful if you're using utility first CSS classes.
