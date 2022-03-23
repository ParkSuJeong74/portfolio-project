import React from 'react'
import Link from 'next/link'
import { AiFillFacebook } from 'react-icons/ai'

// facebook 로그인 화면
const SocialLogin = () => (
  <div>
    <Link href="http://localhost:5001/auth/facebook" />
      <a>
        <AiFillFacebook style={{ fontSize: '100' }} />
      </a>
    </div>
)
    
export default SocialLogin;