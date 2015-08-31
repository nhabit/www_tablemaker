defmodule WwwTablemaker.PageController do
  use WwwTablemaker.Web, :controller

   def index(conn, _params) do
    type = ["Prime", "Fibonacci"]
    count = 10
    render conn, "index.html", type: type, count: count 
  end
end
