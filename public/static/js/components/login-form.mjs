import { html, Hooks } from '../preact/preact.mjs';
import { useAuth } from '../utils/auth/auth.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { RouteIndex } from '../routes.mjs';
import { style } from '../utils/style.mjs';
import { useIfMounted } from '../utils/if-mounted.mjs';

const FORM_STYLE = style({
  width: '100%',
  'max-width': '420px',
  padding: '15px',
  margin: '50px auto 0 auto',
});

const EMAIL_INPUT_STYLE = style({
  'text-transform': 'lowercase',
});

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
      login(email.toLocaleLowerCase(), password)
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
    <form style=${FORM_STYLE} onSubmit=${handleSubmit}>
      <fieldset disabled=${isSigningIn}>
        <h1>Войти</h1>
        <div className="form-group">
          <label for="email-input">
            Email
          </label>
          <input
            style=${EMAIL_INPUT_STYLE}
            type="email"
            autocomplete="username"
            className="form-control"
            id="email-input"
            aria-describedby="emailHelp"
            placeholder="Введите Email"
            value=${email}
            onInput=${handleEmailInput}
          />
        </div>
        <div className="form-group">
          <label for="password-input">Пароль</label>
          <input
            type="password"
            autocomplete="current-password"
            className="form-control"
            id="password-input"
            placeholder="Введите пароль"
            value=${password}
            onInput=${handlePasswordInput}
          />
        </div>
        <button type="submit" className="btn btn-primary float-right">
          Войти
        </button>
      </fieldset>
    </form>
  `;
};
