function toElement(template) {
  return document.createRange().createContextualFragment(template).children[0];
}

export { toElement }; // export the toElement function
