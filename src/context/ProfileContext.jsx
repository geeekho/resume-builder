import { updateResume } from "@/api/resume";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Loader2, Save } from "lucide-react";
import React, { createContext, useReducer, useContext, useState } from "react";
import { toast } from "sonner";

const initialState = {
  username: "",
  resume_id: "",
  user_id: "",
  email: "",
  title: "",
  content: {
    email: "",
    phone: "",
    skills: [],
    address: "",
    summary: "",
    jobTitle: "",
    lastName: "",
    education: [],
    firstName: "",
    experience: [],
    themeColor: "",
  },
  loading: false,
};

const MyContext = createContext();

const myReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESUME": {
      if (!action.resume.content) return state;
      return {
        ...action.resume,
        content: {
          ...action.resume.content,
          experience:
            action.resume.content?.experience?.length === 0
              ? []
              : action.resume.content?.experience?.map((exp, i) => {
                  return { ...exp, id: i + 1 };
                }),
          education:
            action.resume.content?.education?.length === 0
              ? []
              : action.resume.content?.education?.map((edu, i) => {
                  return { ...edu, id: i + 1 };
                }),
          skills:
            action.resume.content?.skills?.length === 0
              ? []
              : action.resume.content?.skills?.map((edu, i) => {
                  return { ...edu, id: i + 1 };
                }),
        },
      };
    }
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_CONTENT_FIELD": {
      const { field, value } = action.data;
      return {
        ...state,
        content: {
          ...state.content,
          [field]: value,
        },
      };
    }
    // SKILLS
    case "ADD_SKILL":
      return {
        ...state,
        content: {
          ...state.content,
          skills: [...state.content.skills, action.skill],
        },
      };
    case "UPDATE_SKILL":
      if (state.content?.skills?.length > 0) {
        return {
          ...state,
          content: {
            ...state.content,
            skills: state.content?.skills?.map((skill) =>
              skill.id === action.payload.id
                ? { ...skill, ...action.payload }
                : skill,
            ),
          },
        };
      } else {
        return {
          ...state,
          content: {
            ...state.content,
            skills: [{ id: 1, ...action.payload }],
          },
        };
      }
    case "REMOVE_SKILL":
      return {
        ...state,
        content: {
          ...state.content,
          skills: state.content?.skills?.filter(
            (edu) => edu.id != action.payload.id,
          ),
        },
      };
    // EDUCATION
    case "ADD_EDUCATION": {
      return {
        ...state,
        content: {
          ...state.content,
          education: [action.education, ...state.content.education],
        },
      };
    }
    case "UPDATE_EDUCATION":
      if (state.content?.skills?.length > 0) {
        return {
          ...state,
          content: {
            ...state.content,
            education: state.content?.education?.map((edu) =>
              edu.id === action.payload.id
                ? { ...edu, ...action.payload }
                : edu,
            ),
          },
        };
      } else {
        return {
          ...state,
          content: {
            ...state.content,
            education: [{ id: 1, ...action.payload }],
          },
        };
      }
    case "REMOVE_EDUCATION":
      return {
        ...state,
        content: {
          ...state.content,
          education: state.content?.education?.filter(
            (edu) => edu.id != action.payload.id,
          ),
        },
      };
    // EXPERIENCE
    case "ADD_EXPERIENCE": {
      return {
        ...state,
        content: {
          ...state.content,
          experience: [action.experience, ...state.content.experience],
        },
      };
    }
    case "UPDATE_EXPERIENCE": {
      if (state.content?.experience?.length > 0) {
        return {
          ...state,
          content: {
            ...state.content,
            experience: state.content?.experience?.map((edu) =>
              edu.id === action.payload.id
                ? { ...edu, ...action.payload }
                : edu,
            ),
          },
        };
      } else {
        return {
          ...state,
          content: {
            ...state.content,
            experience: [{ id: 1, ...action.payload }],
          },
        };
      }
    }
    case "REMOVE_EXPERIENCE": {
      console.log(action.payload);

      return {
        ...state,
        content: {
          ...state.content,
          experience: state.content?.experience?.filter(
            (edu) => edu.id != action.payload.id,
          ),
        },
      };
    }
    // LOADING
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading, // Set loading state
      };
    default:
      return state;
  }
};

export const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = await getToken({
        template: "supabase",
      });
      if (!!token) {
        await updateResume(token, state);
        toast.success("Details Updated.", {});
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <Button
        className="fixed bottom-3 left-3 px-3"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <Save />
        )}
      </Button>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
