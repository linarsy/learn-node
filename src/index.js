import { connect, sync } from './db';
import { start } from './server';

export default () => {
  connect()
    .then(sync)
    .then(start)
    .catch(err => console.log(err));
};
