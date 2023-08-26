import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Collapse,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
const ProfileUpdate = () => {
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const [open, setOpen] = useState(false);
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
    try {
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
      
      if (response.status !== 200) {
         throw new Error("An error occured")
      }
    } catch (error) {
       alert(error)
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
          users.forEach((ele) => {
            nameRef.current.value = ele.displayName ?? nameRef.current.value;
            photoUrlRef.current.value =
              ele.photoUrl ?? photoUrlRef.current.value;
          });
        }
      } catch (error) {}
    }
    getUserInfo();
    setOpen(true);
  // eslint-disable-next-line
  }, []);

  return (
    <Container className="py-3">
      {show && (
        <Alert
          style={{ maxWidth: "25rem" }}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
          className="mt-3 mx-auto border-0"
        >
          Your email is not verified yet!{" "}
          <Button size="sm" variant="danger" onClick={onVerifyEmailHandler}>
            Verify it
          </Button>
        </Alert>
      )}
      <Collapse in={open}>
        <Card
          style={{ maxWidth: "35rem" }}
          className="mx-auto text-dark shadow border-0 mt-5"
        >
          <Form className="px-3 py-4" onSubmit={onUpdateProfile}>
            <div className="text-center pb-3">
              <h4 className="fw-bold text-success">Personal Details</h4>
            </div>
            <Form.Group className="" controlId="formGridEmail">
              <Form.Label className="fw-bold fs-6">
                {" "}
                <i className="bi bi-person-lines-fill fs-5 pe-2 text-warning" />{" "}
                Full Name
              </Form.Label>
              <Form.Control ref={nameRef} type="text" required />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formGridPassword">
              <Form.Label className="fw-bold fs-6">
                <i className="bi bi-globe fs-5 pe-2 text-warning" />
                Profile Photo URL
              </Form.Label>
              <Form.Control ref={photoUrlRef} type="text" required />
            </Form.Group>
            <Button type="submit" variant="info" className="mt-4 w-100">
              Update
            </Button>
            <Button variant="danger" className="mt-4  w-100">
              Cancel
            </Button>
          </Form>
        </Card>
      </Collapse>
    </Container>
  );
};

export default ProfileUpdate;
