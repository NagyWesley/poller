const parseMessage = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return { [parsedData.type]: parsedData.value };
  } catch (error) {
    console.error({ data }, error);
    return {};
  }
};

export { parseMessage };
