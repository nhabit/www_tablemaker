defmodule WwwTablemaker.PageController do
  use WwwTablemaker.Web, :controller

   def index(conn, _params) do
    type = [%{:return_value => "prime", :display_value => "Prime"}, %{:return_value => "fib", :display_value => "Fibonacci"}]
    render conn, "index.html", type: type, count: 10
  end
end
