const $input = $('.input');
const $results = $('.results ul');

function searchWiki(term) {
  const apiEndpoint = 'https://en.wikipedia.org/w/api.php';
  
  return Rx.Observable.fromPromise(
    $.ajax({
      url: `${apiEndpoint}?&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${term}`,
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrnamespace: 0,
        gsrlimit: 10
      }
    })
  )
}

const keyupStream = Rx.Observable
  .fromEvent($input, 'keyup')
  .filter(ev => ev.keyCode == 13)
  .map(e => e.target.value)
  .filter(val => val.length >= 3)
  .throttle(ev => Rx.Observable.interval(750))
  .distinctUntilChanged();

const mergeStream = keyupStream.switchMap(searchWiki);

const result = mergeStream.subscribe(response => {
  const data = response.query.pages;

  let appendData = ``;

  Object.keys(data).map(key => {
    let val = data[key];
    appendData += `<li>${val.title}</li>`;
  })
  
  $results.append(appendData);
})