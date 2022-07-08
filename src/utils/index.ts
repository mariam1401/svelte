export const convertSingleNumberToTwoDigits = (num: number) => {
  if (num <= 9) {
    return `0${num}`;
  }
  return `${num}`;
};

export const getDate = (time: string) => {
  let timestamp = new Date(time);
  const month = timestamp.toLocaleString('default', {month: 'short'});
  const year = timestamp.getUTCFullYear();
  const day = timestamp.getUTCDate();
  const hour = convertSingleNumberToTwoDigits(timestamp.getUTCHours());
  const minutes = convertSingleNumberToTwoDigits(timestamp.getUTCMinutes());
  const seconds = convertSingleNumberToTwoDigits(timestamp.getUTCSeconds());
  const monthWithNumber = convertSingleNumberToTwoDigits(
    timestamp.getUTCMonth() + 1
  );
  const decimalDay = convertSingleNumberToTwoDigits(timestamp.getUTCDate());

  return {
    day,
    month,
    minutes,
    hour,
    year,
    seconds,
    monthWithNumber,
    decimalDay
  };
};

export const buildUrl = (path: string, params: object) => {
  const query = {...params};
  let interpolatedPath = path;
  for (const [param, value] of Object.entries(params)) {
    const replaced = interpolatedPath.replace(`[${param}]`, value);
    if (replaced !== interpolatedPath) {
      interpolatedPath = replaced;
      delete query[param];
    }
  }
  const search = new URLSearchParams(query).toString();
  return `${interpolatedPath}${search ? `?${search}` : ''}`;
};

export function clickOutside(node) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
