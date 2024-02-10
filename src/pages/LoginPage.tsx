import Title from '@components/shared/Title'
import useAuth from '@auth/useAuth'

import IconGoogle from '@assets/icon/icon-google.svg?react'
import IconKakao from '@assets/icon/icon-kakao.svg?react'
import IconNaver from '@assets/icon/icon-naver.svg?react'

import classNames from 'classnames/bind'
import styles from './LoginPage.module.scss'

const cx = classNames.bind(styles)

const LoginPage = () => {
  const { handleGoogleLogin } = useAuth()

  return (
    <div className={cx('loginContainer')}>
      <div className={cx('loginFormContainer')}>
        <Title title="LOGIN" subTitle="로그인" className={cx('formTitle')} />
        <div className={cx('snsLoginContainer')}>
          <div className={cx('snsLogin')}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={cx('btn', 'google')}
            >
              <IconGoogle width={28} height={28} />
              <span>구글로 시작하기</span>
            </button>
            <button type="button" className={cx('btn', 'kakao')}>
              <IconKakao width={35} height={35} />
              <span>카카오로 시작하기</span>
            </button>
            <button type="button" className={cx('btn', 'naver')}>
              <IconNaver width={35} height={35} />
              <span>네이버로 시작하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
