import './ProfileHeader.css'

import { Col, Row, Button, Figure, Image } from 'react-bootstrap'
import { AuthContext } from './../../context/auth.context'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

function ProfileHeader() {

    const { user } = useContext(AuthContext)

    return (

        <Row className='my-5'>
            <Col xs={{ span: 3, offset: 3 }} className='d-flex justify-content-center'>
                <div className="profile-image">
                    <Figure.Image width={150} height={150} src={user.profileImg} alt="" />
                </div>
            </Col>
            <Col xs={6} className='d-flex justify-content-center flex-column'>
                <div>
                    <h3>{user.name} {user.lastName}</h3>
                </div>
            </Col>
        </Row>
    )

}

export default ProfileHeader