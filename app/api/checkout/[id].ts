export async function POST(request: Request) {
  const id = request.query.id;

  try {
    if (!id.startsWith('cs_')) {
      throw new Error('Incorrect checkout session id');
    }
  } catch (error) {}
}
