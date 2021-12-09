import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API from "./api";

export const useGetAllUsers = () => {
  const toast = useToast();
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { users, usersLoading, usersError };
};

export const useAddNewUser = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateUser = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useGetAllClients = () => {
  const toast = useToast();
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { clients, clientsLoading, clientsError };
};

export const useAddNewClient = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateClient = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useGetAllCompanies = () => {
  const toast = useToast();
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { companies, companiesLoading, companiesError };
};

export const useAddNewCompany = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};

export const useUpdateCompany = (onClose) => {
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
      onError: (error) => {
        toast({
          title: error?.response?.data?.message || error.message,
          status: "error",
        });
      },
    }
  );
  return { mutate, isLoading, isSuccess, error };
};
