import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import FontAwesome from "react-fontawesome"
import { Center } from "../component/parts"

const Page403 = () => (
  <Center>
    <Helmet>
      <title>Batsu: 403 Permission Denied</title>
    </Helmet>
    <div>
      <FontAwesome name="exclamation" size="4x" color="red" />
    </div>
    <p>คุณไม่มีสิทธิในการเข้าใช้บริการในส่วนนี้ โปรดติดต่อผู้ดูแลระบบ</p>
    <Link className="button is-text is-large" to="/">
      กลับไปหน้าแรก
    </Link>
  </Center>
)

export default Page403
