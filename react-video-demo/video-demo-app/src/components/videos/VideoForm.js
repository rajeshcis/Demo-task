import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
const required = value =>
  value || typeof value === "number" ? undefined : "Required";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

let VideoForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form  onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
        validate={[required]}
      />
      <Field
        name="description"
        type="text"
        component={renderField}
        label="Description"
        validate={[required]}
      />
      <Field
        name="thumbnailUrl"
        type="text"
        component={renderField}
        label="Thumbnail Url"
        validate={[required]}
      />
      <Field
        name="snapshotUrl"
        type="text"
        component={renderField}
        label="Snapshot Url"
        validate={[required]}
      />
      <div>
        <button type="submit" className="btn btn-success" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
VideoForm = reduxForm({
  form: "initializeFromState", // a unique identifier for this form
  enableReinitialize: true
})(VideoForm);

// You have to connect() to any reducers that you wish to connect to yourself
VideoForm = connect(state => {
  return {
    initialValues: state.videos.video // pull initial values from account reducer
  };
})(VideoForm);

export default VideoForm;
