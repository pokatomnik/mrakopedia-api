import { html, Hooks } from '../preact/preact.mjs';
import { useAuth } from '../utils/auth/auth.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { RouteIndex } from '../routes.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';
import { Form } from './form.mjs';
import { EMAIL_INPUT_STYLE } from '../utils/style.mjs';

export const LoginForm = () => {
  const ifMounted = useIfMounted();
  const [isSigningIn, setIsSigningIn] = Hooks.useState(false);
  const { user, login } = useAuth();
  const { push } = useRouteData();

  Hooks.useEffect(() => {
    if (user) {
      push(RouteIndex.link());
    }
  }, [user]);

  const [email, setEmail] = Hooks.useState('');
  const [password, setPassword] = Hooks.useState('');
  const handleEmailInput = Hooks.useCallback((evt) => {
    setEmail(evt.currentTarget.value);
  }, []);
  const handlePasswordInput = Hooks.useCallback((evt) => {
    setPassword(evt.currentTarget.value);
  }, []);
  const handleSubmit = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      setIsSigningIn(true);
      login(email.trim().toLocaleLowerCase(), password)
        .then(
          ifMounted(() => {
            setIsSigningIn(false);
          })
        )
        .catch(
          ifMounted(() => {
            alert('Неверные данные для входа');
            setIsSigningIn(false);
          })
        );
    },
    [email, password, ifMounted]
  );

  return html`
    <${Form} onSubmit=${handleSubmit} busy=${isSigningIn}>
      <h1>Войти</h1>
      <div className="form-group">
        <label for="email-input">
          Email
        </label>
        <input
          style=${EMAIL_INPUT_STYLE}
          required
          type="email"
          autocomplete="email"
          className="form-control"
          id="email-input"
          value=${email}
          onInput=${handleEmailInput}
        />
      </div>
      <div className="form-group">
        <label for="password-input">Пароль</label>
        <input
          required
          type="password"
          autocomplete="current-password"
          className="form-control"
          id="password-input"
          value=${password}
          onInput=${handlePasswordInput}
        />
      </div>
      <button type="submit" className="btn btn-primary float-right">
        Войти
      </button>
    </${Form}>
  `;
};
