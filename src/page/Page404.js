import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import FontAwesome from "react-fontawesome"
import { Center } from "../component/parts"

const Page404 = () => (
  <Center>
    <Helmet>
      <title>Hailing: 404 Not found</title>
    </Helmet>
    <div>
      <FontAwesome name="search" size="4x" color="red" />
    </div>
    <p>ไม่พบข้อมูล</p>
    <Link className="button is-text is-large" to="/">
      กลับไปหน้าแรก
    </Link>
  </Center>
)

export default Page404
