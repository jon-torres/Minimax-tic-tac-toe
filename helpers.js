//Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
export function hasClass(ele, className) {
  if (ele.classList) return ele.classList.contains(className);
  else
    return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

export function addClass(ele, className) {
  if (ele.classList) ele.classList.add(className);
  else if (!hasClass(ele, className)) ele.className += ' ' + className;
}

export function removeClass(ele, className) {
  if (ele.classList) ele.classList.remove(className);
  else if (hasClass(ele, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
