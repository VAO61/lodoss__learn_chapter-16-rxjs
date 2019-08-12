import { getRandomUser } from './api';
import { clearContainers, renderingUser } from './renderingUserDOM';
import { Observable } from 'rxjs';
// import { createSubscribe } from './utils';

const container = document.querySelector(
  '.widget-users__users-list.users-list'
);
// debugger;
let usersArray = [];

//  = Observable.create((observer) =>

const userData$ = Observable.create(observer => {
  getRandomUser().then(({ data }) => {
    observer.next(data);
    observer.complete();
  });
});

// const render = () => {
//   getUserData(3);
//   renderingUserList(
//     usersArray,
//     document.querySelector('.widget-users__users-list.users-list')
//   );
// };

Observable.fromEvent(document.querySelector('#refresh'), 'click').subscribe(e =>
  getUserData(3)
);

export const showUser = index => {
  userData$.subscribe(data => {
    const userWidget = renderingUser(data, index);
    const container = document.querySelector(
      `.widget-users__users-list.users-list-${index}`
    );
    container.appendChild(userWidget);
  });
};

const getUserData = count => {
  clearContainers('.widget-users__users-list');
  for (let i = 0; i < count; i++) {
    showUser(i);
  }

  // for (let i = 1; i <= count; i++) {
  //   usersArray.push(userData$);
  // }
  // console.log(usersArray);
};

getUserData(3);

// render();
// console.log(userData$);
// renderingUserWidget();

// Rx.Observable.fromPromise(axios.get('//jsonplaceholder.typicode.com/users'))

/**
 * Observable.fromEvent(document.querySelector('#refresh'), 'click')
 * .debounceTime(2000) // не чаще, чем раз в 2 секунды чтобы не спамить апишке
 * .mergeMap(randomLogin => Observable.fromPromise(apiGetUser(randomLogin)))
 * .cache(error => Observable.of(error))
 * .subscribe(x => {
 *  ...
 * })
 */
