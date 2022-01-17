import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useErrorHandler from "utils/errorHandler";
import API from "./api";

export const useChangePass = () => {
  const errorHandler = useErrorHandler();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.changePass(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Password Changed", status: "success" });
      },
      onError: (error) => errorHandler(error, "post"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useGetAllUsers = () => {
  const errorHandler = useErrorHandler();
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(
    "allUsers",
    async () => {
      let api = new API();
      const res = await api.getAllUsers();
      return res.data.data;
    },
    {
      onError: (error) => errorHandler(error),
    }
  );
  return { users, usersLoading, usersError };
};

export const useAddNewUser = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.addNewUser(values);
    },
    {
      onSuccess: () => {
        toast({ title: "User Added", status: "success" });
        queryClient.invalidateQueries("allUsers");
        onClose();
      },
      onError: (error) => errorHandler(error, "post"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateUser = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.updateUser(values);
    },
    {
      onSuccess: () => {
        toast({ title: "User Updated", status: "success" });
        queryClient.invalidateQueries("allUsers");
        onClose();
      },
      onError: (error) => errorHandler(error, "put"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useGetCurrUserInfo = () => {
  const errorHandler = useErrorHandler();
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    isError: userInfoError,
  } = useQuery(
    "userInfo",
    async () => {
      let api = new API();
      const res = await api.getCurrUserInfo();
      const todos = res.data.data.todos.map((todo) => {
        return {
          ...todo,
          gigStart: todo.gigStart ? new Date(todo.gigStart) : new Date(),
          gigEnd: todo.gigEnd ? new Date(todo.gigEnd) : new Date(),
          gigArrive: todo.gigArrive ? new Date(todo.gigArrive) : new Date(),
          gigGoHome: todo.gigGoHome ? new Date(todo.gigGoHome) : new Date(),
          embargo: todo.embargo ? new Date(todo.embargo) : new Date(),
        };
      });

      return {
        ...res.data.data,
        todos: todos,
      };
    },
    {
      onError: (error) => errorHandler(error),
    }
  );
  return { userInfo, userInfoLoading, userInfoError };
};

export const useGetAllClients = () => {
  const errorHandler = useErrorHandler();
  const {
    data: clients,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useQuery(
    "allClients",
    async () => {
      let api = new API();
      const res = await api.getAllClients();
      return res.data.data;
    },
    {
      onError: (error) => errorHandler(error),
    }
  );
  return { clients, clientsLoading, clientsError };
};

export const useAddNewClient = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.addNewClient(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Client Added", status: "success" });
        queryClient.invalidateQueries("allClients");
        onClose();
      },
      onError: (error) => errorHandler(error, "post"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateClient = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.updateClient(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Client Updated", status: "success" });
        queryClient.invalidateQueries("allClients");
        onClose();
      },
      onError: (error) => errorHandler(error, "put"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useGetAllCompanies = () => {
  const errorHandler = useErrorHandler();
  const {
    data: companies,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useQuery(
    "allCompanies",
    async () => {
      let api = new API();
      const res = await api.getAllCompanies();
      return res.data.data;
    },
    {
      onError: (error) => errorHandler(error),
    }
  );
  return { companies, companiesLoading, companiesError };
};

export const useAddNewCompany = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.addNewCompany(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Company Added", status: "success" });
        queryClient.invalidateQueries("allCompanies");
        onClose();
      },
      onError: (error) => errorHandler(error, "post"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateCompany = (onClose) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.updateCompany(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Company Updated", status: "success" });
        queryClient.invalidateQueries("allCompanies");
        onClose();
      },
      onError: (error) => errorHandler(error, "put"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useAddNewGig = () => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.addNewGig(values);
    },
    {
      onSuccess: () => {
        toast({ title: "Gig Added", status: "success" });
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries("allGigs");
      },
      onError: (error) => errorHandler(error, "post"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useEditGig = (gigId) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, error } = useMutation(
    async (values) => {
      const api = new API();
      await api.editGig(gigId, values);
    },
    {
      onSuccess: () => {
        toast({ title: "Gig Edited", status: "success" });
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries("allGigs");
      },
      onError: (error) => errorHandler(error, "put"),
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateGigStatus = (gigId) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    mutate: mutateStatusUpdate,
    isLoading: isLoadingStatusUpdate,
    isSuccess,
    error,
  } = useMutation(
    async (values) => {
      const api = new API();
      await api.updateGigStatus(gigId, values.step, values);
    },
    {
      onSuccess: () => {
        toast({ title: "Gig Status Updated", status: "success" });
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries("allGigs");
      },
      onError: (error) => errorHandler(error, "put"),
    }
  );
  return { mutateStatusUpdate, isLoadingStatusUpdate, isSuccess, error };
};

export const useGetAllGigs = () => {
  const errorHandler = useErrorHandler();
  const {
    data: gigs,
    isLoading: gigsLoading,
    isError: gigsError,
  } = useQuery(
    "allGigs",
    async () => {
      let api = new API();
      const res = await api.getAllGigs();
      return res.data.data;
    },
    {
      onError: (error) => errorHandler(error),
    }
  );
  return { gigs, gigsLoading, gigsError };
};
