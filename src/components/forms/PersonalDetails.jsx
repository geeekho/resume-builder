import { useCallback } from "react";
import { Input } from "../ui/input";
import { useMyContext } from "@/context/ProfileContext";

const PersonalDetails = () => {
  const { state: resumeInfo, dispatch } = useMyContext();

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch({ type: "UPDATE_CONTENT_FIELD", data: { field: name, value } });
    },
    [dispatch],
  );

  return (
    <>
      <h2 className="text-lg font-bold capitalize">Personal Details</h2>
      <span className="capitalize">get started with the basic information</span>
      <form>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* first name */}
          <div>
            <label htmlFor="firstName" className="capitalize">
              first name
            </label>
            <Input
              required
              name="firstName"
              id="firstName"
              defaultValue={resumeInfo?.content.firstName ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* last name */}
          <div>
            <label htmlFor="lastName" className="capitalize">
              last name
            </label>
            <Input
              required
              name="lastName"
              id="lastName"
              defaultValue={resumeInfo?.content.lastName ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* job title */}
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="capitalize">
              job title
            </label>
            <Input
              required
              name="jobTitle"
              id="jobTitle"
              defaultValue={resumeInfo?.content.jobTitle ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* address */}
          <div className="col-span-2">
            <label htmlFor="address" className="capitalize">
              address
            </label>
            <Input
              required
              name="address"
              id="address"
              defaultValue={resumeInfo?.content.address ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* phone */}
          <div>
            <label htmlFor="phone" className="capitalize">
              phone
            </label>
            <Input
              type="tel"
              required
              name="phone"
              id="phone"
              defaultValue={resumeInfo?.content.phone ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* email */}
          <div>
            <label htmlFor="email" className="capitalize">
              email
            </label>
            <Input
              type="email"
              required
              name="email"
              id="email"
              defaultValue={resumeInfo?.content.email ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalDetails;
