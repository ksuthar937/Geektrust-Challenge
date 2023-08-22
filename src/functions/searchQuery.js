export function searchQuery(data, search) {
  var obj = [],
    index = 0;
  for (var i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (
        data[i][key].toString().toLowerCase().indexOf(search.toLowerCase()) !==
        -1
      ) {
        obj[index] = data[i];
        index++;
        break;
      }
    }
  }
  return obj;
}
