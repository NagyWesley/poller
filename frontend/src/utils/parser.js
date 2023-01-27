const parseMessage = (message) => {
  try {
    const data = JSON.parse(message.data);
    console.log({ data });
    return data.value;
  } catch (error) {
    console.error({ message }, error);
    return {};
  }
};

export { parseMessage };
