import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

/**
 * Handles old WordPress /page/N/ URLs by redirecting to the homepage.
 * The SPA handles pagination client-side, so all /page/* routes go to /.
 */
export function PaginationRedirect() {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage — the SPA handles pagination internally
    navigate("/", { replace: true });
  }, [navigate, page]);

  return null;
}
