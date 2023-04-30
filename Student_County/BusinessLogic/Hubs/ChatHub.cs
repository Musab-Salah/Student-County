using Microsoft.AspNetCore.SignalR;

namespace Student_County.BusinessLogic.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        //public async Task SendMessage(ChatMessage message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", message);
        //}

        //public async Task SendToUser(string user, string receiverConnectionId, string message)
        //{
        //    await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", user, message);
        //}

        //public string GetConnectionId() => Context.ConnectionId;

        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}
