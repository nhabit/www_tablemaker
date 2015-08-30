defmodule WwwTablemaker.PageController do
  use WwwTablemaker.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
