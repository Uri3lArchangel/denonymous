import { Suspense, lazy } from 'react';

const Denonymous = lazy(() => import('@/src/FE/components/subcomponents/CreatePosts'));

export async function fetchDenonymousOnLoad(cookie) {
 
  const res = await fetch(process.env.baseURL + "/api/fetchUser", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ cookie: cookie.value }),
    next: {
      revalidate: false,
      tags: ["denonymous_box_0102"],
    },
  });

  const data = await res.json();
  return data.data.denonymous; // Assuming denonymous data is within data.data.denonymous
}

export default function Denonyms() {
  const [denonyms, setDenonyms] = useState([]); // Use state to manage denonyms

  useEffect(() => {
    const fetchDenonymous = async () => {
      const cookie = cookies().get("denon_session_0");
      const fetchedDenonyms = await fetchDenonymousOnLoad(cookie);
      setDenonyms(fetchedDenonyms.reverse()); // Reverse denonyms if desired
    };

    fetchDenonymous();
  }, []);

  return (
    <EdgeStoreProvider>
      <Suspense fallback={<LoadingSkeleton />}>
        <Denonymous denonyms={denonyms} />
      </Suspense>
    </EdgeStoreProvider>
  );
}
