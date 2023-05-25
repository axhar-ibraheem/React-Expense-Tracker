import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../store/context";
import Logout from "../Components/Logout";
const ProfileUpdate = () => {
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const ctx = useContext(Context);
  console.log(ctx);
  const onUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const enteredName = nameRef.current.value;
      const enteredPhotoUrl = photoUrlRef.current.value;

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${ctx.apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
            idToken: ctx.idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        const errorMessage = data.error;
        console.log(errorMessage);
      }
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${ctx.apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.idToken,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const { users } = data;
        users.forEach(
          (ele) => (
            (nameRef.current.value = ele.displayName),
            (photoUrlRef.current.value = ele.photoUrl)
          )
        );
      } else {
        const error = data.error.message;
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  return (
    <Container className="py-3">
      <Row className="align-items-center border-bottom border-2 border-success pb-3">
        <Col lg="6" className="d-flex ">
          <div className="mx-auto mx-lg-0">
            <h5 className="text-capitalize">
              Winners never quit, Quitters never win
            </h5>
          </div>
        </Col>
        <Col className="d-flex mt-3 mt-md-0" lg={6}>
          <div className="ms-lg-auto mx-auto mx-lg-0 w-50 text-center">
            <p className="pe-3 ">
              Your Profile Is 64% complelte. A complete Profile has higher
              chances of landing a job.
            </p>
            <span className="fst-italic">Complete Now</span>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end my-2">
        <Logout />
      </div>

      <Form className="shadow rounded py-3 mt-2" onSubmit={onUpdateProfile}>
        <div className="text-center py-4">
          <h4 className="fw-bold text-success">Contact Details</h4>
        </div>
        <Row className="mb-3 justify-content-center px-4">
          <Form.Group className="" as={Col} lg={4} controlId="formGridEmail">
            <Form.Label className="fw-bold fs-6">
              {" "}
              <i className="bi bi-person-lines-fill fs-5 pe-2 text-warning"></i>{" "}
              Full Name
            </Form.Label>
            <Form.Control ref={nameRef} type="text" />
          </Form.Group>

          <Form.Group as={Col} lg={4} controlId="formGridPassword">
            <Form.Label className="fw-bold fs-6">
              <i className="bi bi-globe fs-5 pe-2 text-warning"></i> Photo
              Profile URL
            </Form.Label>
            <Form.Control ref={photoUrlRef} type="text" />
          </Form.Group>
          <Col lg={1} className="align-self-end">
            <Button type="submit" variant="info" className="mt-4 mt-lg-0 w-100">
              Update
            </Button>
          </Col>
          <Col lg={1} className="align-self-end">
            <Button variant="danger" className="mt-4 mt-lg-0 w-100">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileUpdate;
