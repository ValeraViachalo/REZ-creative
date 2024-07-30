import { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import classNames from "classnames";

import "../Form.scss";
import { Link } from "react-router-dom";
import { URL_FORM_HELLO_FORM } from "@/helpers/dataHelpers/linksAPI";
import { ScrollTrigger } from "gsap/all";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

const validationSchema = Yup.object({
  name: Yup.string().required("The field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  message: Yup.string(),
});

export const MainForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const { data } = useContext(DataContext);

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios({
          method: "post",
          url: URL_FORM_HELLO_FORM,
          data: values,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          ScrollTrigger.refresh(true)
          setSubmitting(false);
          setSubmitted(true);
        });
      }}
    >
      {(formik) => (
        <div>
          {submitted && (
            <div className="form form--submited" dangerouslySetInnerHTML={{ __html: data?.form?.message_after_form_submit }}/>
          )}
          {!submitted && (
            <Form className="form form--main">
              <div className="form__input-wrapper">
                <Field
                  type="text"
                  name="name"
                  placeholder="Hello! Type your name"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "name") &&
                      getIn(formik.touched, "name"),
                  })}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__input-wrapper">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={classNames("form__input", {
                    "form__input--error":
                      getIn(formik.errors, "email") &&
                      getIn(formik.touched, "email"),
                  })}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="form__input-wrapper form__input-wrapper--textarea">
                <p>Tell us about your project</p>
                <Field
                  as="textarea"
                  name="message"
                  className={classNames("form__input form__input--textarea", {
                    "form__input--error":
                      getIn(formik.errors, "message") &&
                      getIn(formik.touched, "message"),
                  })}
                />
                <ErrorMessage
                  name="message"
                  component="p"
                  className="form__input-error-msg smallText"
                />
              </div>

              <div className="bottom">
                <button
                  type="submit"
                  className={classNames("form__button", {
                    ["form__button--disabled"]:
                      formik.isSubmitting || !formik.isValid || !formik.dirty,
                  })}
                  disabled={
                    formik.isSubmitting || !formik.isValid || !formik.dirty
                  }
                >
                  Apply
                </button>

                <p className="smallText shadow form__terms">
                  By clicking next, you agree to our
                  <br />
                  <Link to="/terms" className="form__terms-link">
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </div>
      )}
    </Formik>
  );
};
