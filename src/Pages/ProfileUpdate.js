import React, { useEffect, useRef, useState } from "react";
import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";

import Logout from "../Components/Logout";
import axios from "axios";
import { useSelector } from "react-redux";
const ProfileUpdate = () => {
  const nameRef = useRef();
  const photoUrlRef = useRef();

  const apiKey = useSelector((state) => state.auth.apiKey);
  const idToken = useSelector((state) => state.auth.idToken);
  const [show, setShow] = useState(true);

  const onUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const enteredName = nameRef.current.value;
      const enteredPhotoUrl = photoUrlRef.current.value;

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,

        {
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
          idToken: idToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        console.log(data);
      }
    } catch (error) {
    } finally {
    }
  };

  const onVerifyEmailHandler = async () => {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      {
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    if (response.status === 200) {
      console.log(data);
    } else {
      //   const error = data.error.message;
      //   console.log(error);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          {
            idToken: idToken,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = response.data;
        if (response.status === 200) {
          const { users } = data;
          users.forEach((ele) =>
            (nameRef.current.value = ele.displayName)(
              (photoUrlRef.current.value = ele.photoUrl)
            )
          );
        }
      } catch (error) {}
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
      {show && (
        <Alert
          style={{ maxWidth: "25rem" }}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
          className="mt-3 mx-auto"
        >
          Your email is not verified yet!{" "}
          <Button variant="danger" onClick={onVerifyEmailHandler}>
            Verify it
          </Button>
        </Alert>
      )}
      <div className="d-flex justify-content-end my-2">
        <Logout />
      </div>

      <Form className="shadow rounded py-3 mt-2" onSubmit={onUpdateProfile}>
        <div className="text-center pt-4">
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
          <Col lg="auto" className="align-self-end">
            <Button type="submit" variant="info" className="mt-4 mt-lg-0 w-100">
              Update
            </Button>
          </Col>
          <Col lg="auto" className="align-self-end">
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
