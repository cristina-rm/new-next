import { fetchAPI } from "../lib/api";
import { setCookies, checkCookies, getCookie, removeCookies  } from 'cookies-next';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default async (req, res) => {
  const { password, identifier } = req.body;

  try {
    /*const postRes = await axios.post('http://localhost:1337/auth/local', {
      identifier,
      password,
    });*/
    const postRes = await fetchAPI('/auth/local', {
        method: 'POST',
        body: JSON.stringify({
            identifier,
            password
        })
    });

    setCookie({ res }, 'jwt', postRes.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  } catch (e) {
    res.status(400).send(e.response.data.message[0].messages[0]);
  }
}