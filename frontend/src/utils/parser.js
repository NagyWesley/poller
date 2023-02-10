const parseMessage = (data) => {
  try {
    const parsedData = JSON.parse(data);
    console.log({ parsedData });
    return { [parsedData.type]: parsedData.value };
  } catch (error) {
    console.error({ data }, error);
    return {};
  }
};

export { parseMessage };
