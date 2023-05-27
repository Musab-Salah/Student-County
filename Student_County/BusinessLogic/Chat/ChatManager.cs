using Microsoft.EntityFrameworkCore;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public class ChatManager : IChatManager
    {
        protected readonly StudentCountyContext _context;
        public ChatManager(StudentCountyContext context)
        {
            _context = context;
        }


        public async Task<List<RoomEntity>> GetMyAllChats(string userid) => await _context.Rooms.Where(entity =>  entity.From == userid || entity.To == userid)
            .OrderBy(x => x.CreatedOn).ToListAsync();

    }
}
