let config = {
  isOpen: false,
  orientation: undefined,
  isOnce: false,
  threshold: 170,
  intervalTime: 500,
  whiteHosts: ['localhost', '127.0.0.1'],
  blackHosts: [],
};
let interval = null;
let isAccounced = false;

const emitEvent = (isOpen, orientation) => {
  globalThis.dispatchEvent(
    new globalThis.CustomEvent('devtoolschange', {
      detail: {
        isOpen,
        orientation,
      },
    })
  );
};

let accounce = (
  a = 'document lastModified',
  b = globalThis.document.lastModified
) => {
  console.log(
    `%c ${a} %c ${b} `,
    'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
    'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #58BEBE; font-weight: bold;'
  );
};

const main = ({ emitEvents = true } = {}) => {
  const widthThreshold =
    globalThis.outerWidth - globalThis.innerWidth > config.threshold;
  const heightThreshold =
    globalThis.outerHeight - globalThis.innerHeight > config.threshold;
  const orientation = widthThreshold ? 'vertical' : 'horizontal';

  if (
    !(heightThreshold && widthThreshold) &&
    ((globalThis.Firebug &&
      globalThis.Firebug.chrome &&
      globalThis.Firebug.chrome.isInitialized) ||
      widthThreshold ||
      heightThreshold)
  ) {
    if (!isAccounced) {
      accounce();
      config.isOnce && clearInterval(interval);
      isAccounced = true;
    }
    if ((!config.isOpen || config.orientation !== orientation) && emitEvents) {
      emitEvent(true, orientation);
    }

    config.isOpen = true;
    config.orientation = orientation;
  } else {
    if (config.isOpen && emitEvents) {
      emitEvent(false, undefined);
    }

    config.isOpen = false;
    config.orientation = undefined;
  }
};

const devtoolsCatch = (...args) => {
  if (args.length && typeof args[0] === 'object') {
    config = Object.assign(config, args[0]);
  }
  if (args.length > 1 && typeof args[1] === 'function') {
    if (args[2]) {
      accounce = args[1].bind(args[2]);
    } else {
      accounce = args[1];
    }
  }
  if (config.blackHosts.length) {
    if (config.blackHosts.includes(globalThis.location.hostname)) return;
  } else {
    if (!config.whiteHosts.includes(globalThis.location.hostname)) return;
  }
  interval = setInterval(main, config.intervalTime);
};

export default devtoolsCatch;
