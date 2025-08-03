const AUTH_API_URL = 'http://localhost:3000/graphql';

const LOGIN_MUTATION = `
mutation Login($loginUserDto: LoginInput!) {
  login(loginUserDto: $loginUserDto) {
    id
  }
}
`;

const JOBS_API_URL = 'http://localhost:3001/graphql';

const EXECUTE_JOB_MUTATION = `
mutation ExecuteJob($executeJobInput: ExecuteJobInput!) {
  executeJob(input: $executeJobInput) {
    name
  }
}
`;

async function login(email, password) {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: { loginUserDto: { email, password } },
    }),
  });
  const data = await response.json();
  const cookies = response.headers.get('set-cookie');
  return { cookies, data };
}

async function executeJob(executeJobInput, cookies) {
  const response = await fetch(JOBS_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      query: EXECUTE_JOB_MUTATION,
      variables: { executeJobInput },
    }),
    headers: {
      Cookie: cookies,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

(async () => {
  const { cookies, data: loginData } = await login(
    'hamza.hijazi@gmail.com',
    'Test@123'
  );
  console.log(cookies, loginData);
  if (loginData?.data.login.id) {
    // const result = await executeJob(
    //   { job: 'fibonacci', data: { n: 10 } },
    //   cookies
    // );
    // console.log(result);
    const n = 1000;
    const executeJobInput = {
      name: 'Fibonacci',
      data: Array.from({ length: n }, () => ({
        iterations: Math.floor(Math.random() * 5000) + 1,
      })),
    };
    const data = await executeJob(executeJobInput, cookies);
    console.log(data);
  } else {
    console.error('Login failed');
  }
})();
