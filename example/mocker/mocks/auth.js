const Mockjs = require('mockjs');

const user = {
  id: Mockjs.Random.integer(1000000, 9999999),
  phone: '15818881888',
  age: '88',
  name: 'wuhao',
  no: 'admin',
  password: 'admin',
  token: 'TOKEN',
};

let users = [user];

function success(data, msg, other) {
  return {
    code: 200,
    msg: msg || '操作成功',
    data,
    ...other,
  };
}

function fail(data, msg, other) {
  return {
    code: 500,
    msg: msg || '操作失败',
    data,
    ...other,
  };
}

function sleep(interval, func = () => {}, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func(...args));
    }, interval);
  });
}

module.exports = {
  '[GET] /api/user': async (ctx) => {
    await sleep(1000);
    const { name } = ctx.request.query;
    if (name) {
      ctx.body = success(users.filter((user) => user.name.indexOf(name) > -1));
    } else {
      ctx.body = success(users);
    }
  },
  '[POST] /api/user': async (ctx) => {
    await sleep(1000);
    const { name, age, phone } = ctx.request.body;
    users.push({
      id: Mockjs.Random.integer(1000000, 9999999),
      name,
      age,
      phone,
    });
    ctx.body = success(true);
  },
  '[PUT] /api/user/:id': async (ctx) => {
    await sleep(1000);
    const { id } = ctx.params;
    const { name, age, phone } = ctx.request.body;
    const index = users.findIndex(
      (user) => Math.floor(user.id) === Math.floor(id)
    );
    if (index > -1) {
      users[index] = { ...users[index], name, age, phone };
      ctx.body = success(true);
    } else {
      ctx.body = success(false, '未找到相应的用户');
    }
  },
  '[DELETE] /api/user/:id': async (ctx) => {
    await sleep(100000);
    const { id } = ctx.params;
    const index = users.findIndex(
      (user) => Math.floor(user.id) === Math.floor(id)
    );
    if (index > -1) {
      users.splice(index, 1);
      ctx.body = success(true);
    } else {
      ctx.body = success(false, '未找到相应的用户');
    }
  },
  '[POST] /api/user/login': (ctx) => {
    console.log(ctx.request.params, ctx.request.body, ctx.request.query);
    const { username, password } = ctx.request.body;
    if (username !== user.no || password !== user.password) {
      ctx.body = {
        code: 500,
        msg: '账号或密码错误',
        data: null,
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: '操作成功',
      data: user,
    };
  },
};
