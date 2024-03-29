const root = "https://fsd-project-4-backend-1-dev-bzxk.1.us-1.fl0.io/api/";

export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/register`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (credenciales) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}users/profile`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const GetAppointments = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(`${root}appointments`, options);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    return error;
  }
};

export const deleteAppointment = async (postId, token) => {
  try {
    const response = await fetch(`${root}appointments/${postId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
};

export const UpdateProfile = async (token, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}users/profile`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const GetServices = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  };

  try {
    const response = await fetch(`${root}services`, options);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    return error;
  }
};

export const CreateAppointment = async (token, appointment) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(appointment),
  };

  try {
    const response = await fetch(`${root}appointments`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const GetUsers = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  try {
    const response = await fetch(`${root}users`, options);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${root}users/${userId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
};

export const getUserById = async (userId, token) => {
  try {
    const response = await fetch(`${root}user/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('User cant be retrieved');
    }
    return await response.json();
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const updateUserProfile = async (token, userId, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}users/profile/${userId}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const getAppointmentsById = async (token,userId) => {
  try {
    const response = await fetch(`${root}appointments/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('User cant be retrieved');
    }
    return await response.json();
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const deleteService = async (serviceId, token) => {
  try {
    const response = await fetch(`${root}services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    throw error;
  }
};

export const getServiceById = async (serviceId, token) => {
  try {
    const response = await fetch(`${root}services/${serviceId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('User cant be retrieved');
    }
    return await response.json();
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const updateService = async (token, serviceId, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}services/${serviceId}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const CreateService = async (token, service) => {
  console.log(token)
  console.log(service)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(service),
  };

  try {
    const response = await fetch(`${root}services`, options);
    console.log(response)
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};