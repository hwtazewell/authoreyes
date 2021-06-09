export function post(route, data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      return fetch(route, requestOptions).then(res => res.json())
};

export function set_token(data) {
  localStorage.setItem('jwt',JSON.stringify({token: data.token, user_id: data.user_id}))
};

export function auth_post(route, data) {
  if (!data) {
    data  = {}
  }
  let jwt = JSON.parse(localStorage.getItem('jwt'))
  let auth_data = {
    'token': jwt ? jwt['token'] : 'token', 
    'user_id': jwt ? jwt['user_id'] : 'user_id'
  }
  data.token = auth_data.token;
  data.user_id = auth_data.user_id;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  
  return fetch(route, requestOptions).then(res => res.json())
}

