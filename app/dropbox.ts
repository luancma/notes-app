const DROPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_DROPBOX_ACCESS_TOKEN;

export const downloadFromDropbox = async () => {
  const res = await fetch("https://content.dropboxapi.com/2/files/download", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
      "Dropbox-API-Arg": JSON.stringify({
        path: "/notes-backup.json",
      }),
    },
  });

  return res.json();
};
