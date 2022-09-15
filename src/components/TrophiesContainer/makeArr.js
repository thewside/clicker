export const makeArr = (count, creationFn) => {
    let result = new Array(count)
    for(let i = 0; i < count; i++){
      result[i] = creationFn(i)
    }
    return result
};
