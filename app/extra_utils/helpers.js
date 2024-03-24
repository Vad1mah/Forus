async function funcsHandleErrors(asyncFunc) {
    try {
      await asyncFunc();
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
}
  
function isNumberNotEmpty(str) {
    return !isNaN(str) && str.trim() !== '';
}

module.exports = { funcsHandleErrors, isNumberNotEmpty }