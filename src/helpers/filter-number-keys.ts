/**
 * only allow numeric values on the user code input
 * @param evt input event
 */
export function filterNumberKeys(evt: React.KeyboardEvent) {
  const keyCode = evt.keyCode || evt.which;

  // Don't validate the input if below arrow, delete and backspace keys were pressed
  if ((keyCode === 65  && (evt.ctrlKey || evt.metaKey)) || // for highlight
    (keyCode === 67  && (evt.ctrlKey || evt.metaKey)) || // for copying
    (keyCode === 86  && (evt.ctrlKey || evt.metaKey)) || // for pasting
    keyCode === 8 || keyCode === 9 ||
    (keyCode >= 35 && keyCode <= 40) || // Left / Up / Right / Down Arrow, Backspace, Delete keys
    (keyCode >= 96 && keyCode <= 105)) { // number keypad
    return;
  }

  const regex = new RegExp('^[0-9]+$');
  const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);

  if (!regex.test(key)) {
    evt.preventDefault();
    return false;
  }
}

