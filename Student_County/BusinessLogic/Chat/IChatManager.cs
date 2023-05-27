using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public interface IChatManager
    {
        Task<List<RoomEntity>> GetMyAllChats(string userid);

    }
}
