defmodule WwwTablemaker.TablemakerChannel do
  use Phoenix.Channel
  require Logger
  import ExUnit.CaptureIO


  def join("maketable:", auth_msg, socket) do
    {:ok, socket}
  end

 
  def handle_in("maketable", %{"type" => type, "count" => count}, socket) do
    table = capture_io fn -> Tablemaker.run( [type: type, count: String.to_integer(count)]) end
    # table = Tablemaker.run(:json, [type: type, count: String.to_integer(count)])
    push socket, "drawtable", %{table: table}
    {:noreply, socket}
  end

  def terminate(reason, socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end
end